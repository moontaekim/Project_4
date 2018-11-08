class Api::ItemapiController < ApplicationController
  include HTTParty

  def search
    headers = {
      "x-app-id" => "a4f47d7e",
      "x-app-key" => "bcf4edaee1a304522b9e99e7e984a8f8"
    }

    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    @items = HTTParty.post(url, :headers => headers, :body => {:query => params["query"]})
    render json: @items
  end

end
