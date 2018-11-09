class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.integer :servings
      t.integer :nf_calories
      t.string :food_name
      t.string :query
      t.references :meal, foreign_key: true

      t.timestamps
    end
  end
end
