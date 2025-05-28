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
 * ResponseHotelOwnedpaintingsPaintings
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelOwnedpaintingsPaintings   {
  @JsonProperty("taken_on")
  private LocalDate takenOn = null;

  @JsonProperty("dimensions")
  private String dimensions = null;

  @JsonProperty("artist")
  private String artist = null;

  @JsonProperty("status")
  private String status = null;

  @JsonProperty("title")
  private String title = null;

  @JsonProperty("image_url")
  private String imageUrl = null;

  public ResponseHotelOwnedpaintingsPaintings takenOn(LocalDate takenOn) {
    this.takenOn = takenOn;
    return this;
  }

  /**
   * Get takenOn
   * @return takenOn
   **/
  @Schema(example = "Wed Dec 11 01:00:00 CET 2024", description = "")
  
    @Valid
    public LocalDate getTakenOn() {
    return takenOn;
  }

  public void setTakenOn(LocalDate takenOn) {
    this.takenOn = takenOn;
  }

  public ResponseHotelOwnedpaintingsPaintings dimensions(String dimensions) {
    this.dimensions = dimensions;
    return this;
  }

  /**
   * Get dimensions
   * @return dimensions
   **/
  @Schema(example = "50cm x 100cm x 10cm", description = "")
  
    public String getDimensions() {
    return dimensions;
  }

  public void setDimensions(String dimensions) {
    this.dimensions = dimensions;
  }

  public ResponseHotelOwnedpaintingsPaintings artist(String artist) {
    this.artist = artist;
    return this;
  }

  /**
   * Get artist
   * @return artist
   **/
  @Schema(example = "@artist2023", description = "")
  
    public String getArtist() {
    return artist;
  }

  public void setArtist(String artist) {
    this.artist = artist;
  }

  public ResponseHotelOwnedpaintingsPaintings status(String status) {
    this.status = status;
    return this;
  }

  /**
   * Get status
   * @return status
   **/
  @Schema(example = "IN DELIVERY TO YOU", description = "")
  
    public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public ResponseHotelOwnedpaintingsPaintings title(String title) {
    this.title = title;
    return this;
  }

  /**
   * Get title
   * @return title
   **/
  @Schema(example = "Pejzaż górski", description = "")
  
    public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public ResponseHotelOwnedpaintingsPaintings imageUrl(String imageUrl) {
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
    ResponseHotelOwnedpaintingsPaintings responseHotelOwnedpaintingsPaintings = (ResponseHotelOwnedpaintingsPaintings) o;
    return Objects.equals(this.takenOn, responseHotelOwnedpaintingsPaintings.takenOn) &&
        Objects.equals(this.dimensions, responseHotelOwnedpaintingsPaintings.dimensions) &&
        Objects.equals(this.artist, responseHotelOwnedpaintingsPaintings.artist) &&
        Objects.equals(this.status, responseHotelOwnedpaintingsPaintings.status) &&
        Objects.equals(this.title, responseHotelOwnedpaintingsPaintings.title) &&
        Objects.equals(this.imageUrl, responseHotelOwnedpaintingsPaintings.imageUrl);
  }

  @Override
  public int hashCode() {
    return Objects.hash(takenOn, dimensions, artist, status, title, imageUrl);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelOwnedpaintingsPaintings {\n");
    
    sb.append("    takenOn: ").append(toIndentedString(takenOn)).append("\n");
    sb.append("    dimensions: ").append(toIndentedString(dimensions)).append("\n");
    sb.append("    artist: ").append(toIndentedString(artist)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
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
