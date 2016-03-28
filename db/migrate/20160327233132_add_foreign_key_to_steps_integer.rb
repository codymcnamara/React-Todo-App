class AddForeignKeyToStepsInteger < ActiveRecord::Migration
  def change
    add_column :steps, :todo_id, :integer
  end
end
