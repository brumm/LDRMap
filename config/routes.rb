LDRMap::Application.routes.draw do
  get "site/index"

	resources :couples
  get "couples/new"

  get "couples/index"

  root :to => "site#index"

end
