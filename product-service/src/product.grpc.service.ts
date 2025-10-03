import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductCreateRequest {
  name: string;
  price: number;
}

interface ProductUpdateRequest {
  id: number;
  name?: string;
  price?: number;
}

@Injectable()
export class ProductGrpcService {
  private products: Product[] = [];
  private nextId = 1;

  createProduct(request: ProductCreateRequest): Product {
    const product: Product = {
      id: this.nextId++,
      name: request.name,
      price: request.price,
    };
    this.products.push(product);
    return product;
  }

  getProduct(byId: { id: number }): Product {
    const found = this.products.find((p) => p.id === byId.id);
    return found ?? { id: 0, name: '', price: 0 };
  }

  listProducts(): { items: Product[] } {
    return { items: this.products };
  }

  updateProduct(request: ProductUpdateRequest): Product {
    const index = this.products.findIndex((p) => p.id === request.id);
    if (index === -1) {
      return { id: 0, name: '', price: 0 };
    }
    const current = this.products[index];
    const updated: Product = {
      id: current.id,
      name: request.name ?? current.name,
      price: request.price ?? current.price,
    };
    this.products[index] = updated;
    return updated;
  }

  deleteProduct(byId: { id: number }): { success: boolean } {
    const before = this.products.length;
    this.products = this.products.filter((p) => p.id !== byId.id);
    return { success: this.products.length < before };
  }
}


