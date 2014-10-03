Rails.application.routes.draw do
  root "pins#map"
  get "/pins" => "pins#index"
  post "/create" => "pins#create"
end
