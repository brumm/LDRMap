class CreateCouples < ActiveRecord::Migration
  def self.up
    create_table :couples do |t|
      t.string :name_1
      t.string :address_1
      t.decimal :lat_1
      t.decimal :long_1
      t.string :name_2
      t.string :address_2
      t.decimal :lat_2
      t.decimal :long_2
      t.decimal :distance

      t.timestamps
    end
  end

  def self.down
    drop_table :couples
  end
end
