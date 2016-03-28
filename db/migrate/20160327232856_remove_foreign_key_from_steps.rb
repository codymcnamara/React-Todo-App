class RemoveForeignKeyFromSteps < ActiveRecord::Migration
  def change
    remove_foreign_key :steps, :todos
  end
end
