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


item_one = Item.create({ servings: 2, nf_calories: 500, food_name: "Big Mac", query: "Big Mac", meal_id: meal_one.id  })
item_two = Item.create({ servings: 1, nf_calories: 100, food_name: "Chicken Salad", query: "Chicken Salad", meal_id: meal_two.id  })
item_three = Item.create({ servings: 3, nf_calories: 1000, food_name: "Pizza", query: "Pizza", meal_id: meal_three.id  })
item_four = Item.create({ servings: 2, nf_calories: 700, food_name: "French Fries", query: "French Fries", meal_id: meal_one.id  })
item_five = Item.create({ servings: 1, nf_calories: 1700, food_name: "Waffles", query: "Waffles", meal_id: meal_four.id  })
