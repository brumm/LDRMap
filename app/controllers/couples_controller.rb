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
		res = Geocoder::Lookup.coordinates(params[:couple]["address_2"])
		@couple.lat_2 = res[0]
		@couple.long_2 = res[1]

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

end
