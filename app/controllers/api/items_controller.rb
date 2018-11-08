class Api::ItemsController < ApplicationController

  def index
    @meals = User.find(params[:user_id]).meals
    @items = @meals.find(params[:meal_id]).items
    render json: @items
  end

  def create
    @meal = User.find(params[:user_id]).meals
    @item = @meal.find(params[:meal_id]).items.create!(item_params)
    render json: @item
  end

  def show
    @item = User.find(params[:user_id]).meals.find(params[:meal_id]).items.find(params[:id])
    render json: @item
  end

  def update
    @item = Item.find(params[:id])
    @item.update!(item_params)
    render json: @item
  end

  def destroy
    @item = Item.find(params[:id]).delete
    render status: :ok
  end

  
  private

  def item_params
    params.require(:item).permit(:name, :calorie, :serving)
  end

end



# include HTTParty

# def create
#    headers = {
#     "x-app-id" => "a4f47d7e",
#     "x-app-key" => "bcf4edaee1a304522b9e99e7e984a8f8"
#   }
#   @items = HTTParty.post("https://trackapi.nutritionix.com/v2/natural/nutrients", {:headers => headers})
#   # @meal = User.find(params[:user_id]).meals
#   # @item = @meal.find(params[:meal_id]).items.create!(item_params)
#   render json: @items
# end