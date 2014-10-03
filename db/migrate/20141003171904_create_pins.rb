class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
    	t.float :lat
    	t.float :lng
      t.timestamps
    end
  end
end
