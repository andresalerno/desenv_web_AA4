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
exports.Fornecedor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Produto_1 = require("./Produto");
const FornecedorProduto_1 = require("./FornecedorProduto");
let Fornecedor = class Fornecedor extends sequelize_typescript_1.Model {
};
exports.Fornecedor = Fornecedor;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Fornecedor.prototype, "Forn_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Fornecedor.prototype, "Forn_nome", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Fornecedor.prototype, "Forn_razaoSocial", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Fornecedor.prototype, "Forn_cnpj", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Fornecedor.prototype, "Forn_status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Produto_1.Produto, () => FornecedorProduto_1.FornecedorProduto),
    __metadata("design:type", Array)
], Fornecedor.prototype, "produtos", void 0);
exports.Fornecedor = Fornecedor = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Fornecedores' })
], Fornecedor);