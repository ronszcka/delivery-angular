import { Injectable } from "@angular/core";
import { PedidoItemModel } from "../models/pedido.item.model";
import { PedidoModel } from "../models/pedido.model";
import { ProdutoModel } from "../models/produto.model";

@Injectable()
export class PedidoService {

    public pedido: PedidoModel = new PedidoModel();

    public adicionarItem(produto: ProdutoModel): void {
        
        const item = this.pedido.itens.find( item => item.produto.uuid === produto.uuid );

        if (item) {
            item.quantidade++;
        } else {
            this.pedido.itens.push( new PedidoItemModel(produto, 1));
        }

        if (!this.pedido.total) {
            this.pedido.total = 0;
        }

        this.pedido.total += produto.preco;
        
    }

    public removerItem(produto: ProdutoModel): void {
        
        const item = this.pedido.itens.find( item => item.produto.uuid === produto.uuid );

        if (item) {

            item.quantidade--;

            if (!this.pedido.total) {
                this.pedido.total = 0;
            }

            this.pedido.total -= produto.preco;

            if (item.quantidade === 0) {
                this.pedido.itens.splice(this.pedido.itens.indexOf(item), 1);
            }

        }

    }

}