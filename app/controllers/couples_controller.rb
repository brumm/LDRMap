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

    respond_to do |format|
      if @couple.save
        format.html { redirect_to(:root) }
      else
        format.html { redirect_to(:root) }
      end
    end
  end
end
