class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.string :body
      t.boolean :done

      t.timestamps null: false
    end
  end
end
