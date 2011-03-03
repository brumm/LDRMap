class CouplesController < ApplicationController
  def new
		@couple = Couple.new
		
		respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @couple }
    end
  end

  def index
		@couples = Couple.all
		
		respond_to do |format|
	    format.html
	    format.json { render :json => @couples }
	  end
  end

  def show
    @couple = Couple.find(params[:id])
    
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @couple }
    end
  end

  def create
    @couple = Couple.new(params[:couple])
		
		#ugliest hackery
		res1 = Geocoder::Lookup.coordinates(params[:couple]["address_1"])
		res2 = Geocoder::Lookup.coordinates(params[:couple]["address_2"])
		
		@couple.lat_1 = res1[0]
		@couple.long_1 = res1[1]
		
		@couple.lat_2 = res2[0]
		@couple.long_2 = res2[1]
		@couple.distance = Geocoder::Calculations.distance_between( @couple.lat_1, @couple.long_1,  @couple.lat_2, @couple.long_2).round(2)

    respond_to do |format|
      if @couple.save
        format.html { redirect_to(:root) }
      else
        format.html { redirect_to(:root) }
      end
    end
  end

  def edit
    @couple = Couple.find(params[:id])
  end

  def update
    @couple = Couple.find(params[:id])

    respond_to do |format|
      if @couple.update_attributes(params[:couple])
        format.html { redirect_to(:root) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def destroy
    @couple = Couple.find(params[:id])
    @couple.destroy

    respond_to do |format|
      format.html { redirect_to(:root) }
      format.xml  { head :ok }
    end
  end
end
