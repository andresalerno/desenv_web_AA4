"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FornecedorProduto = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Produto_1 = require("./Produto");
const Fornecedor_1 = require("./Fornecedor");
let FornecedorProduto = class FornecedorProduto extends sequelize_typescript_1.Model {
};
exports.FornecedorProduto = FornecedorProduto;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Produto_1.Produto),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], FornecedorProduto.prototype, "Prod_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Fornecedor_1.Fornecedor),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], FornecedorProduto.prototype, "Forn_id", void 0);
exports.FornecedorProduto = FornecedorProduto = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'FornecedorProduto' })
], FornecedorProduto);
