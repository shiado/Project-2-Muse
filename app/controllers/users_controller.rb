class PostsController < ApplicationController

  def show
  @user = User.find(params[:id])
end
