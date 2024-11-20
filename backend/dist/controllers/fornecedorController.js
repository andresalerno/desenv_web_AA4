"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FornecedorController = void 0;
const Fornecedor_1 = require("../models/Fornecedor");
const Produto_1 = require("../models/Produto");
const FornecedorProduto_1 = require("../models/FornecedorProduto");
class FornecedorController {
    // Método para listar todos os fornecedores com seus produtos associados
    listarFornecedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fornecedores = yield Fornecedor_1.Fornecedor.findAll({
                    include: [{
                            model: Produto_1.Produto,
                            as: 'produtos', // Alias da associação
                            through: { attributes: [] }, // Ignora a tabela intermediária
                        }]
                });
                return res.status(200).json(fornecedores);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao listar fornecedores', error });
            }
        });
    }
    // Método para buscar um fornecedor por ID, incluindo produtos associados
    buscarFornecedorPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const fornecedor = yield Fornecedor_1.Fornecedor.findByPk(id, {
                    include: [{
                            model: Produto_1.Produto,
                            as: 'produtos', // Alias da associação
                            through: { attributes: [] }, // Ignora a tabela intermediária
                        }]
                });
                if (!fornecedor) {
                    return res.status(404).json({ message: 'Fornecedor não encontrado' });
                }
                return res.status(200).json(fornecedor);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao buscar fornecedor', error });
            }
        });
    }
    // Método para criar um novo fornecedor e associá-lo a produtos
    criarFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Forn_nome, Forn_razaoSocial, Forn_cnpj, Forn_status } = req.body;
                // Criação do novo fornecedor
                const novoFornecedor = yield Fornecedor_1.Fornecedor.create({
                    Forn_nome,
                    Forn_razaoSocial,
                    Forn_cnpj,
                    Forn_status
                });
                // Associando produtos ao novo fornecedor
                const { produtos } = req.body;
                if (produtos && Array.isArray(produtos)) {
                    yield Promise.all(produtos.map((produtoId) => __awaiter(this, void 0, void 0, function* () {
                        yield FornecedorProduto_1.FornecedorProduto.create({
                            Forn_id: novoFornecedor.Forn_id,
                            Prod_id: produtoId,
                        });
                    })));
                }
                return res.status(201).json(novoFornecedor);
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao criar fornecedor', error });
            }
        });
    }
    atualizarFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { Forn_nome, Forn_razaoSocial, Forn_cnpj, Forn_status, produtos } = req.body;
            try {
                // Buscar o fornecedor pelo ID
                const fornecedor = yield Fornecedor_1.Fornecedor.findByPk(id);
                // Verificar se o fornecedor existe
                if (!fornecedor) {
                    return res.status(404).json({ message: 'Fornecedor não encontrado' });
                }
                // Atualizar as informações do fornecedor
                yield fornecedor.update({
                    Forn_nome: Forn_nome || fornecedor.Forn_nome, // Mantém valor atual se não for enviado
                    Forn_razaoSocial: Forn_razaoSocial || fornecedor.Forn_razaoSocial,
                    Forn_cnpj: Forn_cnpj || fornecedor.Forn_cnpj,
                    Forn_status: Forn_status !== undefined ? Forn_status : fornecedor.Forn_status, // Verifica booleano explicitamente
                });
                // Atualizar as associações com produtos (se enviados)
                if (produtos && Array.isArray(produtos)) {
                    // Remover associações antigas
                    yield FornecedorProduto_1.FornecedorProduto.destroy({ where: { Forn_id: fornecedor.Forn_id } });
                    // Adicionar novas associações
                    yield Promise.all(produtos.map((produtoId) => __awaiter(this, void 0, void 0, function* () {
                        yield FornecedorProduto_1.FornecedorProduto.create({
                            Forn_id: fornecedor.Forn_id,
                            Prod_id: produtoId,
                        });
                    })));
                }
                // Retornar o fornecedor atualizado
                const fornecedorAtualizado = yield Fornecedor_1.Fornecedor.findByPk(id, {
                    include: [{ model: Produto_1.Produto }], // Inclui os produtos associados, se aplicável
                });
                return res.status(200).json(fornecedorAtualizado);
            }
            catch (error) {
                console.error('Erro ao atualizar fornecedor:', error);
                return res.status(500).json({ message: 'Erro ao atualizar fornecedor', error });
            }
        });
    }
    // Método para deletar um fornecedor e remover suas associações com produtos
    deletarFornecedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const fornecedor = yield Fornecedor_1.Fornecedor.findByPk(id);
                if (!fornecedor) {
                    return res.status(404).json({ message: 'Fornecedor não encontrado' });
                }
                // Remover as associações de produtos antes de deletar o fornecedor
                yield FornecedorProduto_1.FornecedorProduto.destroy({ where: { Forn_id: fornecedor.Forn_id } });
                // Deletar o fornecedor
                yield fornecedor.destroy();
                return res.status(204).send();
            }
            catch (error) {
                return res.status(500).json({ message: 'Erro ao deletar fornecedor', error });
            }
        });
    }
}
exports.FornecedorController = FornecedorController;
