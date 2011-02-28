class Couple < ActiveRecord::Base
	validates :name_1, :presence => true
	validates :name_2, :presence => true
	validates :address_1, :presence => true
	validates :address_2, :presence => true
	
  geocoded_by :address_1, :latitude  => :lat_1, :longitude => :long_1
  after_validation :fetch_coordinates
end