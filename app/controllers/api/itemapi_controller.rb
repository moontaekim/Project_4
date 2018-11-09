class Api::ItemapiController < ApplicationController
  include HTTParty

  def search
    headers = {
      "x-app-id" => Figaro.env.app_id,
      "x-app-key" => Figaro.env.api_key
    }

    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    @items = HTTParty.post(url, :headers => headers, :body => {:query => params["query"]})
    render json: @items
  end

end
