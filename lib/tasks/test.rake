namespace :test do
  task :new_task => :environment do
    Couple.all.each do |couple|
			couple.distance = Geocoder::Calculations.distance_between(couple.lat_1, couple.long_1,  couple.lat_2, couple.long_2).round(2)
			couple.save
    end
  end
end
