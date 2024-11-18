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
exports.Produto = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Fornecedor_1 = require("./Fornecedor");
let Produto = class Produto extends sequelize_typescript_1.Model {
};
exports.Produto = Produto;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Produto.prototype, "Prod_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Produto.prototype, "Prod_nome", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Produto.prototype, "Prod_marca", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Produto.prototype, "Prod_modelo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Produto.prototype, "Prod_preco", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Fornecedor_1.Fornecedor),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Produto.prototype, "Forn_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Fornecedor_1.Fornecedor, { as: 'fornecedor' }),
    __metadata("design:type", Fornecedor_1.Fornecedor)
], Produto.prototype, "fornecedor", void 0);
exports.Produto = Produto = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Produtos' })
], Produto);
