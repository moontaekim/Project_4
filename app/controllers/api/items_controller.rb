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
    @meal = Meal.find(params[:id])
    @meal.update!(meal_params)
    render json: @meal
  end

  def destroy
    @meal = Meal.find(params[:id]).delete
    render status: :ok
  end

  
  private

  def item_params
    params.require(:item).permit(:name, :calorie, :serving)
  end

end
