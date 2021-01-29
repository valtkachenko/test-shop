const { Model } = require('objection')

class Product extends Model {
  static get tableName() {
    return 'products'
  }

  static get relationMappings() {
    const List = require('./List')
    const User = require('./User')

    return {
      lists: {
        relation: Model.ManyToManyRelation,
        modelClass: List,
        join: {
          from: 'products.id',
          through: {
            from: 'lists_to_products.userId',
            to: 'lists_to_products.listId'
          },
          to: 'lists.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'products.userId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Product