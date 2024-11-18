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
exports.CompraProduto = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Produto_1 = require("./Produto");
const Compras_1 = require("./Compras");
let CompraProduto = class CompraProduto extends sequelize_typescript_1.Model {
};
exports.CompraProduto = CompraProduto;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Produto_1.Produto),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CompraProduto.prototype, "Prod_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Compras_1.Compra),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CompraProduto.prototype, "Compra_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CompraProduto.prototype, "Quantidade", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Produto_1.Produto),
    __metadata("design:type", Produto_1.Produto)
], CompraProduto.prototype, "produto", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Compras_1.Compra),
    __metadata("design:type", Compras_1.Compra)
], CompraProduto.prototype, "compra", void 0);
exports.CompraProduto = CompraProduto = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'CompraProduto' })
], CompraProduto);
