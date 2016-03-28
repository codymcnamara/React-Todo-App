class Todo < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true
  validates :done, inclusion: [true, false]
  has_many :steps, dependent: :destroy
end
