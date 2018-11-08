Rails.application.routes.draw do

post '/api/items/search', to: 'api/itemapi#search'  


namespace :api do
    resources :users do
      resources :meals do
        resources :items 
        
      end
    end
  end
end

