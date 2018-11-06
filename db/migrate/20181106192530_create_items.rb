class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.integer :serving
      t.integer :calorie
      t.string :name
      t.references :meal, foreign_key: true

      t.timestamps
    end
  end
end
