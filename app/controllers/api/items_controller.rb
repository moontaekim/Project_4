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
    params.require(:item).permit(:food_name, :nf_calories, :query)
  end

end

