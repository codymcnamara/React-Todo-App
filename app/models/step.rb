class Step < ActiveRecord::Base
  validates :body, presence: true
  validates :done, inclusion: [true, false]
  validates :todo_id, presence: true
  belongs_to :todo

end
