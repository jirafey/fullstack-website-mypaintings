package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseArtystaMojedzielaDziela
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseArtystaMojedzielaDziela   {
  @JsonProperty("id")
  private Integer id = null;

  @JsonProperty("date_of_post")
  private LocalDate dateOfPost = null;

  @JsonProperty("price")
  private String price = null;

  @JsonProperty("hotel")
  private String hotel = null;

  @JsonProperty("viewers")
  private Integer viewers = null;

  @JsonProperty("likes")
  private Integer likes = null;

  @JsonProperty("image_url")
  private String imageUrl = null;

  public ResponseArtystaMojedzielaDziela id(Integer id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
   **/
  @Schema(example = "123", description = "")
  
    public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public ResponseArtystaMojedzielaDziela dateOfPost(LocalDate dateOfPost) {
    this.dateOfPost = dateOfPost;
    return this;
  }

  /**
   * Get dateOfPost
   * @return dateOfPost
   **/
  @Schema(example = "Mon Nov 11 01:00:00 CET 2024", description = "")
  
    @Valid
    public LocalDate getDateOfPost() {
    return dateOfPost;
  }

  public void setDateOfPost(LocalDate dateOfPost) {
    this.dateOfPost = dateOfPost;
  }

  public ResponseArtystaMojedzielaDziela price(String price) {
    this.price = price;
    return this;
  }

  /**
   * Get price
   * @return price
   **/
  @Schema(example = "$600", description = "")
  
    public String getPrice() {
    return price;
  }

  public void setPrice(String price) {
    this.price = price;
  }

  public ResponseArtystaMojedzielaDziela hotel(String hotel) {
    this.hotel = hotel;
    return this;
  }

  /**
   * Get hotel
   * @return hotel
   **/
  @Schema(example = "@NY_Hotel_Star", description = "")
  
    public String getHotel() {
    return hotel;
  }

  public void setHotel(String hotel) {
    this.hotel = hotel;
  }

  public ResponseArtystaMojedzielaDziela viewers(Integer viewers) {
    this.viewers = viewers;
    return this;
  }

  /**
   * Get viewers
   * @return viewers
   **/
  @Schema(example = "59", description = "")
  
    public Integer getViewers() {
    return viewers;
  }

  public void setViewers(Integer viewers) {
    this.viewers = viewers;
  }

  public ResponseArtystaMojedzielaDziela likes(Integer likes) {
    this.likes = likes;
    return this;
  }

  /**
   * Get likes
   * @return likes
   **/
  @Schema(example = "12", description = "")
  
    public Integer getLikes() {
    return likes;
  }

  public void setLikes(Integer likes) {
    this.likes = likes;
  }

  public ResponseArtystaMojedzielaDziela imageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  /**
   * Get imageUrl
   * @return imageUrl
   **/
  @Schema(example = "https://example.com/images/image.png", description = "")
  
    public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseArtystaMojedzielaDziela responseArtystaMojedzielaDziela = (ResponseArtystaMojedzielaDziela) o;
    return Objects.equals(this.id, responseArtystaMojedzielaDziela.id) &&
        Objects.equals(this.dateOfPost, responseArtystaMojedzielaDziela.dateOfPost) &&
        Objects.equals(this.price, responseArtystaMojedzielaDziela.price) &&
        Objects.equals(this.hotel, responseArtystaMojedzielaDziela.hotel) &&
        Objects.equals(this.viewers, responseArtystaMojedzielaDziela.viewers) &&
        Objects.equals(this.likes, responseArtystaMojedzielaDziela.likes) &&
        Objects.equals(this.imageUrl, responseArtystaMojedzielaDziela.imageUrl);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, dateOfPost, price, hotel, viewers, likes, imageUrl);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseArtystaMojedzielaDziela {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    dateOfPost: ").append(toIndentedString(dateOfPost)).append("\n");
    sb.append("    price: ").append(toIndentedString(price)).append("\n");
    sb.append("    hotel: ").append(toIndentedString(hotel)).append("\n");
    sb.append("    viewers: ").append(toIndentedString(viewers)).append("\n");
    sb.append("    likes: ").append(toIndentedString(likes)).append("\n");
    sb.append("    imageUrl: ").append(toIndentedString(imageUrl)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
