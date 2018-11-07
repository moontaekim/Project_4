# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Meal.destroy_all
Item.destroy_all


user_one = User.create({ name: 'Moon', cal_goal: 1800 })

meal_one = Meal.create({ description: 'Breakfast', date: 20181106, time: '09:00AM', user_id: user_one.id  })
meal_two = Meal.create({ description: 'Lunch', date: 20181106, time: '12:00PM', user_id: user_one.id  })
meal_three = Meal.create({ description: 'Dinner', date: 20181106, time: '06:00PM', user_id: user_one.id  })


meal_four = Meal.create({ description: 'Breakfast', date: 20181107, time: '09:00AM', user_id: user_one.id  })
meal_five = Meal.create({ description: 'Lunch', date: 20181107, time: '01:00PM', user_id: user_one.id  })


item_one = Item.create({ serving: 2, calorie: 500, name: "Big Mac", meal_id: meal_one.id  })
item_two = Item.create({ serving: 1, calorie: 100, name: "Chicken Salad", meal_id: meal_two.id  })
item_three = Item.create({ serving: 3, calorie: 1000, name: "Pizza", meal_id: meal_three.id  })
item_four = Item.create({ serving: 2, calorie: 700, name: "French Fries", meal_id: meal_one.id  })
item_five = Item.create({ serving: 1, calorie: 1700, name: "Waffles", meal_id: meal_four.id  })
