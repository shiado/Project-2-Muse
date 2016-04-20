Rails.application.routes.draw do

  root "posts#index_all"

  # root "pages#show", page: "home"
  # root "posts#index"
  resources :posts do
    member do
      put "like" => "posts#upvote"
      put "unlike" => "posts#downvote"

    end
end

# resources :users, only: :show



#for devise
  devise_for :users
  # devise_for :users, controllers: {
  #         sessions: 'users/sessions'
  #       }
#for muse allposts routes
  get 'allposts', to: 'posts#index_all'



# for homepage
  Rails.application.routes.draw do
  get "/:page" => "pages#show"
end

# Rails.application.routes.draw do
# get "/:user/:id" => "users#show"
# end
#
# get 'users', to: 'posts#index'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
