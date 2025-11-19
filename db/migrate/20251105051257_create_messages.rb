class CreateMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :messages do |t|
      t.text :body
      t.references :topic, null: false, foreign_key: true

      t.timestamps
    end
  end
end
