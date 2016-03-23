class UsersController < ApplicationController
  def show
    @posts = Post.where(user_id: params[:id])
    @user = User.find( params[:id] )
  end
end
