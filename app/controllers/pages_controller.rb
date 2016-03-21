class PagesController < ApplicationController
  def show
    render template: "pages/#{params[:page]}", layout: "homeapplication"
  end
end
