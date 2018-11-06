class Api::MealsController < ApplicationController

  def index
    @meals = User.find(params[:user_id]).meals
    render json: @meals
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
    @user = User.find(params[:id])
    @user.update!(user_params)
    render json: @user
  end

  def destroy
    @user = User.find(params[:id]).delete
    render status: :ok
  end

  
  private

  def meal_params
    params.require(:meal).permit(:description, :date, :time)
  end

end
