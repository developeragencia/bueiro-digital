import { PaymentPlatformService } from '../PaymentPlatformService';
import { Transaction } from '../../../types/payment';

export class CartPandaService extends PaymentPlatformService {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(apiKey: string, secretKey: string, sandbox: boolean = true) {
    super();
    this.baseUrl = sandbox
      ? 'https://api.sandbox.cartpanda.com.br'
      : 'https://api.cartpanda.com.br';
    this.headers = {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
      'X-Secret-Key': secretKey,
    };
  }

  async fetchOrders(): Promise<Transaction[]> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/orders`, {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.orders.map(this.mapOrderToTransaction);
    } catch (error) {
      console.error('Erro ao buscar pedidos do CartPanda:', error);
      throw error;
    }
  }

  private mapOrderToTransaction(order: any): Transaction {
    return {
      id: order.id.toString(),
      platformId: 'cartpanda',
      orderId: order.order_number,
      amount: order.total_amount,
      currency: 'BRL',
      status: this.mapStatus(order.status),
      customer: {
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        document: order.customer.document,
      },
      product: {
        id: order.items[0].product_id,
        name: order.items[0].name,
        price: order.items[0].price,
        quantity: order.items[0].quantity,
      },
      paymentMethod: order.payment_method,
      createdAt: new Date(order.created_at),
      updatedAt: new Date(order.updated_at),
      metadata: {
        items: order.items,
        payment: {
          installments: order.payment_details.installments,
          installmentAmount: order.payment_details.installment_amount,
          paymentLink: order.payment_details.payment_link,
          expiresAt: order.payment_details.expires_at,
        },
        customer: {
          address: order.customer.address,
          city: order.customer.city,
          state: order.customer.state,
          zipcode: order.customer.zipcode,
        },
        affiliate: {
          id: order.affiliate.id,
          name: order.affiliate.name,
          commission: order.affiliate.commission,
        },
        funnel: {
          id: order.funnel.id,
          name: order.funnel.name,
          step: order.funnel.step,
        },
        utm: {
          source: order.utm_source,
          medium: order.utm_medium,
          campaign: order.utm_campaign,
          content: order.utm_content,
          term: order.utm_term,
        },
      },
    };
  }

  private mapStatus(status: string): 'completed' | 'pending' | 'failed' {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'paid':
      case 'completed':
        return 'completed';
      case 'pending':
      case 'waiting_payment':
      case 'processing':
        return 'pending';
      case 'cancelled':
      case 'refunded':
      case 'expired':
      default:
        return 'failed';
    }
  }

  async syncTransactions(): Promise<void> {
    try {
      const orders = await this.fetchOrders();
      for (const order of orders) {
        await this.saveTransaction(order);
      }
    } catch (error) {
      console.error('Erro ao sincronizar transações do CartPanda:', error);
      throw error;
    }
  }

  async createWebhook(url: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/webhooks`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          url,
          events: [
            'order.created',
            'order.paid',
            'order.cancelled',
            'order.refunded',
            'order.expired',
          ],
          active: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao criar webhook no CartPanda:', error);
      throw error;
    }
  }

  async handleWebhook(payload: any): Promise<void> {
    try {
      if (payload.event.startsWith('order.')) {
        const transaction = this.mapOrderToTransaction(payload.data);
        await this.saveTransaction(transaction);
      }
    } catch (error) {
      console.error('Erro ao processar webhook do CartPanda:', error);
      throw error;
    }
  }
} 