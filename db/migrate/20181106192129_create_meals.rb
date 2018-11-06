class CreateMeals < ActiveRecord::Migration[5.2]
  def change
    create_table :meals do |t|
      t.string :description
      t.date :date
      t.string :time
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
