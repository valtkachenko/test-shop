const { Model } = require('objection')

class List extends Model {
  static get tableName() {
    return 'lists'
  }

  static get relationMappings() {
    const User = require('./User')
    const Product = require('./Product')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'lists.userId',
          to: 'users.id'
        }
      },
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'lists.id',
          through: {
            from: 'lists_to_products.listId',
            to: 'lists_to_products.productId'
          },
          to: 'products.id'
        }
      }
    }
  }
}

module.exports = List