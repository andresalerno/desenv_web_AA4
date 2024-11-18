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
exports.Compra = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Produto_1 = require("./Produto");
const Compra_produto_1 = require("./Compra_produto");
let Compra = class Compra extends sequelize_typescript_1.Model {
};
exports.Compra = Compra;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Compra.prototype, "Compra_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Compra.prototype, "Compra_data", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Compra.prototype, "Compra_total", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Produto_1.Produto, () => Compra_produto_1.CompraProduto),
    __metadata("design:type", Array)
], Compra.prototype, "produtos", void 0);
exports.Compra = Compra = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Compras' })
], Compra);
