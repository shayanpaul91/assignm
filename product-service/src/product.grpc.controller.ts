import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Product, ProductGrpcService } from './product.grpc.service';

@Controller()
export class ProductGrpcController {
  constructor(private readonly productService: ProductGrpcService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  createProduct(data: { name: string; price: number }): Product {
    return this.productService.createProduct(data);
  }

  @GrpcMethod('ProductService', 'GetProduct')
  getProduct(data: { id: number }): Product {
    return this.productService.getProduct(data);
  }

  @GrpcMethod('ProductService', 'ListProducts')
  listProducts(): { items: Product[] } {
    return this.productService.listProducts();
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  updateProduct(data: { id: number; name?: string; price?: number }): Product {
    return this.productService.updateProduct(data);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  deleteProduct(data: { id: number }): { success: boolean } {
    return this.productService.deleteProduct(data);
  }
}


