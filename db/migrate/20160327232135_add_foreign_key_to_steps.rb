class AddForeignKeyToSteps < ActiveRecord::Migration
  def change
    add_foreign_key :steps, :todos
  end
end
