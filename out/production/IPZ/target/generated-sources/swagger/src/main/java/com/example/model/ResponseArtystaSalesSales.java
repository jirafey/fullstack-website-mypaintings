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
 * ResponseArtystaSalesSales
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseArtystaSalesSales   {
  @JsonProperty("sold_on")
  private LocalDate soldOn = null;

  @JsonProperty("price")
  private String price = null;

  @JsonProperty("hotel")
  private String hotel = null;

  @JsonProperty("likes")
  private Integer likes = null;

  @JsonProperty("image_url")
  private String imageUrl = null;

  public ResponseArtystaSalesSales soldOn(LocalDate soldOn) {
    this.soldOn = soldOn;
    return this;
  }

  /**
   * Get soldOn
   * @return soldOn
   **/
  @Schema(example = "Wed Dec 11 01:00:00 CET 2024", description = "")
  
    @Valid
    public LocalDate getSoldOn() {
    return soldOn;
  }

  public void setSoldOn(LocalDate soldOn) {
    this.soldOn = soldOn;
  }

  public ResponseArtystaSalesSales price(String price) {
    this.price = price;
    return this;
  }

  /**
   * Get price
   * @return price
   **/
  @Schema(example = "$650", description = "")
  
    public String getPrice() {
    return price;
  }

  public void setPrice(String price) {
    this.price = price;
  }

  public ResponseArtystaSalesSales hotel(String hotel) {
    this.hotel = hotel;
    return this;
  }

  /**
   * Get hotel
   * @return hotel
   **/
  @Schema(example = "@GoldenHotelNY", description = "")
  
    public String getHotel() {
    return hotel;
  }

  public void setHotel(String hotel) {
    this.hotel = hotel;
  }

  public ResponseArtystaSalesSales likes(Integer likes) {
    this.likes = likes;
    return this;
  }

  /**
   * Get likes
   * @return likes
   **/
  @Schema(example = "13", description = "")
  
    public Integer getLikes() {
    return likes;
  }

  public void setLikes(Integer likes) {
    this.likes = likes;
  }

  public ResponseArtystaSalesSales imageUrl(String imageUrl) {
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
    ResponseArtystaSalesSales responseArtystaSalesSales = (ResponseArtystaSalesSales) o;
    return Objects.equals(this.soldOn, responseArtystaSalesSales.soldOn) &&
        Objects.equals(this.price, responseArtystaSalesSales.price) &&
        Objects.equals(this.hotel, responseArtystaSalesSales.hotel) &&
        Objects.equals(this.likes, responseArtystaSalesSales.likes) &&
        Objects.equals(this.imageUrl, responseArtystaSalesSales.imageUrl);
  }

  @Override
  public int hashCode() {
    return Objects.hash(soldOn, price, hotel, likes, imageUrl);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseArtystaSalesSales {\n");
    
    sb.append("    soldOn: ").append(toIndentedString(soldOn)).append("\n");
    sb.append("    price: ").append(toIndentedString(price)).append("\n");
    sb.append("    hotel: ").append(toIndentedString(hotel)).append("\n");
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
