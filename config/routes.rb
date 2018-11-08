Rails.application.routes.draw do

  get '/api/users/:user_id/meals/:meal_id/items/search', to: 'items#search'  

namespace :api do
    resources :users do
      resources :meals do
        resources :items 
        
      end
    end
  end
end

