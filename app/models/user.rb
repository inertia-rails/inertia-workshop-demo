class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # Remove recoverable since we don't have email setup
  # :recoverable,
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable
  has_many :messages, dependent: :destroy
  has_many :topics, dependent: :nullify
  has_many :chat_messages, dependent: :destroy

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end
