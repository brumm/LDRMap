class SiteController < ApplicationController
  def index
		@couple = Couple.new
		@couples = Couple.find(:all, :order => "distance DESC")
  end

end
