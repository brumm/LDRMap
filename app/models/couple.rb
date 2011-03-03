class Couple < ActiveRecord::Base
	validates :name_1, :presence => true
	validates :name_2, :presence => true
		
	validates :address_1, :presence => true
	validates :address_2, :presence => true
end