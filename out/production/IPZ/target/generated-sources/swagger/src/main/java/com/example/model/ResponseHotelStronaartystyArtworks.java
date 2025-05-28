package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelStronaartystyArtworks
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelStronaartystyArtworks   {
  @JsonProperty("artwork_id")
  private Integer artworkId = null;

  @JsonProperty("image_url")
  private String imageUrl = null;

  @JsonProperty("is_liked")
  private Boolean isLiked = null;

  public ResponseHotelStronaartystyArtworks artworkId(Integer artworkId) {
    this.artworkId = artworkId;
    return this;
  }

  /**
   * Get artworkId
   * @return artworkId
   **/
  @Schema(example = "456", description = "")
  
    public Integer getArtworkId() {
    return artworkId;
  }

  public void setArtworkId(Integer artworkId) {
    this.artworkId = artworkId;
  }

  public ResponseHotelStronaartystyArtworks imageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  /**
   * Get imageUrl
   * @return imageUrl
   **/
  @Schema(example = "https://example.com/images/pejzaz.jpg", description = "")
  
    public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public ResponseHotelStronaartystyArtworks isLiked(Boolean isLiked) {
    this.isLiked = isLiked;
    return this;
  }

  /**
   * Get isLiked
   * @return isLiked
   **/
  @Schema(example = "true", description = "")
  
    public Boolean isIsLiked() {
    return isLiked;
  }

  public void setIsLiked(Boolean isLiked) {
    this.isLiked = isLiked;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelStronaartystyArtworks responseHotelStronaartystyArtworks = (ResponseHotelStronaartystyArtworks) o;
    return Objects.equals(this.artworkId, responseHotelStronaartystyArtworks.artworkId) &&
        Objects.equals(this.imageUrl, responseHotelStronaartystyArtworks.imageUrl) &&
        Objects.equals(this.isLiked, responseHotelStronaartystyArtworks.isLiked);
  }

  @Override
  public int hashCode() {
    return Objects.hash(artworkId, imageUrl, isLiked);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelStronaartystyArtworks {\n");
    
    sb.append("    artworkId: ").append(toIndentedString(artworkId)).append("\n");
    sb.append("    imageUrl: ").append(toIndentedString(imageUrl)).append("\n");
    sb.append("    isLiked: ").append(toIndentedString(isLiked)).append("\n");
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
