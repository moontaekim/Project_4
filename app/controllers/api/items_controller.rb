class Api::ItemsController < ApplicationController

  def index
    @meals = User.find(params[:user_id]).meals
    @items = @meals.find(params[:meal_id]).items
    render json: @items
  end

  def create
    @meal = User.find(params[:user_id]).meals.create!(meal_params)
    render json: @meal
  end

  def show
    @meal = User.find(params[:user_id]).meals.find(params[:id])
    render json: @meal
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

  def meal_params
    params.require(:meal).permit(:description, :date, :time)
  end

end
